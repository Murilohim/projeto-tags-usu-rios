/* eslint-disable @typescript-eslint/no-explicit-any */
export const customStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#1F2937',
        borderColor: 'transparent',
        borderRadius: '0.575rem',
        boxShadow: '0 0 #0000',
        border: '2px solid transparent',
        color: 'white',
        '&:hover': {
            borderColor: 'rgb(249 115 22)'
        }
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: '#1F2937'
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#FB923C' : state.isFocused ? '#374151' : '#1F2937',
        color: 'white'
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#f1f6ff'
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: '#374151'
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: 'white'
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            backgroundColor: '#FB923C',
            color: 'white'
        }
    })
};