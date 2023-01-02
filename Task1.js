const parser = new DOMParser();

const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`

const listNode = parser.parseFromString(xmlString, "text/xml");

const studentNodes = [...listNode.querySelectorAll('student')];
const nameNodes = studentNodes.map(item => item.querySelector('name'));
const ageNodes = studentNodes.map(item => item.querySelector('age'));
const profNodes = studentNodes.map(item => item.querySelector('prof'));
const firstNameNodes = nameNodes.map(item => item.querySelector('first'));
const secondNameNodes = nameNodes.map(item => item.querySelector('second'));

const langAttrs = nameNodes.map(item => item.getAttribute('lang'));

const obj = {
    list: []
};

const student = {
    name: '',
    age: '',
    prof: '',
    lang: '',
};

for(let i = 0; i < studentNodes.length; i++){
    student.name = firstNameNodes[i].textContent + ' ' + secondNameNodes[i].textContent;
    student.age = Number(ageNodes[i].textContent);
    student.prof = profNodes[i].textContent;
    student.lang = langAttrs[i];
    obj.list.push({...student});
}

console.log(obj);