// JavaScript is a subset of TypeScript : Syntax is almost same

// Program 1
// number, string, boolean, null, undefined
const a : number = 5;
console.log(a);



// Program 2
// functions
function func(a:number,b:number):string{
    return `Hi, sum of ${a} and ${b} is ${a+b}`;
}
const b : string = func(5,6);
console.log(b);

function greet(name:string){
    console.log("Hi my name is "+name);
}
greet("Rahul");



// Program 3
// Passing function inside another function
function Description(func:(a:string,b:number)=>void){ // func : Function
    func("Rahul",35);
}

function About(name:string,age:number){
    console.log(`My name is ${name} and age is ${age}`)
}

Description(About);



// Program 4
// interface, type and classes

type Human = { // can be an inteface
    numberOfEyes : number
}

interface Person extends Human{
    personName : string,
    age : number,
    hobby? : string,
    greet : (a:string)=>void
}

type Hobbies = {
    gameName : string,
    gameType : string
}

class VehicleOwner implements Person{
    personName : string
    age : number
    numberOfEyes = 2
    constructor(a:string,b:number){
        this.personName = a;
        this.age = b;
    }
    greet(personName:string){
        console.log(`Hi there ${personName} from ${this.personName}`);
    }
    hobbiesList(a:Hobbies[]){
        for(let i = 0;i<a.length;i++){
            console.log("gameName: " + a[i].gameName + " gameType: " + a[i].gameType);
        }
    }
}

const vo = new VehicleOwner("Rahul",45);
vo.greet("King");
vo.hobbiesList([
    {gameName:"Badminton",gameType:"Outdoor"},
    {gameName:"Chess",gameType:"Indoor"},
    {gameName:"Hockey",gameType:"Outdoor"}
]);




// Program 5
// type = Inteface1 | or & Interface 2
// LHS should be type and RHS can be anything
type ab = Person | Hobbies
function f1(result:ab){
    console.log(result);
    if("greet" in result){    
        result.greet("Queen");
    }
}

f1({
    personName: "Rahul",
    age: 10,
    greet:function(a:string){
        console.log(`Hi ${a}`)
    }, // function
    numberOfEyes: 2,
    gameName: "Badminton",
    gameType: "Outdoor"
});



// Program 6
// enum
enum ResponseStatus {
    SUCCESS = 200,
    NOT_FOUND = 404,
    FAILURE = 500
}

function f2(type:ResponseStatus){
    if(type==ResponseStatus.SUCCESS){
        console.log("Success : ",ResponseStatus.SUCCESS);
    }
}
f2(ResponseStatus.SUCCESS);



// Progam 7
// Generics
function f3<T>(a:T[]):(T|number|boolean){
    return a[0];
}

console.log(f3<string>(["1","Rahul","King"]));


