const jsonString = `
{
    "list": [
        {
            "name": "Petr",
            "age": "20",
            "prof": "mechanic"
        },
        {
            "name": "Vova",
            "age": "60",
            "prof": "pilot"
        }
    ]
}
`;

const data = JSON.parse(jsonString);
const list = [...data.list];

const obj = {
    list: []
};

const people = {
    name: '',
    age: '',
    prof: '',
};

list.forEach(item => {
    people.name = item.name;
    people.age = Number(item.age);
    people.prof = item.prof;
    obj.list.push({...people});
});

console.log(obj);