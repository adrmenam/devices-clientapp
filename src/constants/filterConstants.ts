const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'WINDOWS_WORKSTATION', label: 'Windows Workstation' },
    { value: 'WINDOWS_SERVER', label: 'Windows Server' },
    { value: 'MAC', label: 'MAC' }
];

const sortOptions = [
    { value: 'system_name', label: 'System Name' },
    { value: 'hdd_capacity', label: 'HDD Capacity' }
];

const filterConstants = {
    TYPE_OPTIONS: typeOptions,
    SORT_OPTIONS: sortOptions
}

export default filterConstants;
