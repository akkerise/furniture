export const rules = () => {
    return [
        {
            name: 'email',
            regex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        },
        {
            name: 'phone',
            regex: /^[0-9]{10,11}$/
        },
        {
            name: 'name',
            regex: /^[a-zA-Z0-9]{8,32}$/
        },
    ];
};