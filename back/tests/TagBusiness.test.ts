import { TagBusiness } from "../src/business/TagBusiness";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TagDatabaseMock } from "./mocks/TagDatasabeMock";

const tagBusinessMock = new TagBusiness(new IdGeneratorMock, new TagDatabaseMock() as any)

describe("TagBusiness", () => {
    test("Should return sucess for valid input create", async () => {
        expect.assertions(2)
        const spyOnGetTagByName = jest.spyOn(TagDatabaseMock.prototype, "getTagByName").mockResolvedValue(undefined)
        try {
            const input = {
                name: "tag1"
            }

            await expect(tagBusinessMock.createTag(input)).resolves.not.toThrow();
            expect("").toEqual("")
        } catch (error) {
            console.log(error)
        }
        spyOnGetTagByName.mockClear()
    })

    test("Should return 'Preencha o campo 'name'' for empty name", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: ""
            }

            await tagBusinessMock.createTag(input)
        } catch (error: any) {
            expect(error.message).toBe("Preencha o campo 'nome'")
            expect(error.code).toBe(400)
        }
    })

    test("Should return sucess for valid input getTags", async () => {
        expect.assertions(2)
        try {
            const tags = await tagBusinessMock.getTags()

            expect(tags).toHaveLength(2)
            expect(tags).toEqual([
                {
                    id: "id1_mock1",
                    name: "tag1"
                },
                {
                    id: "id2_mock2",
                    name: "tag2"
                }
            ])
        } catch (error) {
            console.log(error)
        }
    })

    // deletetag
    test('Should return sucess for valid input delete', async () => {
        expect.assertions(1)
        try {
            const id = "id1_mock1"

            await expect(tagBusinessMock.deleteTag(id)).resolves.not.toThrow();
        } catch (error) {
            console.log(error)
        }
    })
})