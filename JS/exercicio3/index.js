function counter(num){
    let a = 1;
     return function inner (){
        let gt = a;
        a++;
        return num + gt;
     }
}

const incrementar = counter(10);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());