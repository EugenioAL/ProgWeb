class IntegerSet {
    constructor(val){
        this.vetor = []
        this.tam = val

        this.init();
    }

    init(){
        let i = 0;
        while(i < this.tam){
            this.vetor[i] = false;
            i++;
        }
    }

    toString(){
        let descricao = "";
        let i = 0;
        while(i < this.tam){
            if(this.vetor[i] == true){
                if(descricao == ""){
                    descricao = descricao + i;
                }
                else{
                    descricao = descricao + ", " + i;
                }
            } 
            i++;
        }
        return descricao;
    }

    add(num){
        if(num <= this.tam){
            this.vetor[num] = true;
        }
        else{
            console.log("Este numero nao pertence a este conjunto!")
        }
    }

    del(num){
        if(num <= this.tam){
            this.vetor[num] = false;
        }
        else{
            console.log("Este numero nao pertence a este conjunto!")
        }
    }

    uniao(conjunto){
        let x;
        if(this.tam >= conjunto.tam){
            x = this.tam;
        }
        else{
            x = conjunto.tam;
        }

        let i = 0;

        while(i < x){
            if(this.vetor[i] == true || conjunto.vetor[i] == true){
                this.vetor[i] == true;
            }
            i++;
        }
    }

    intersec(conjunto){
        let i = 0;

        while(i < this.tam){
            if(this.vetor[i] == true && conjunto.vetor[i] == true){
                this.vetor[i] == true;
            }
            else{ 
                this.vetor[i] == false;
            }
            i++;
        }
    }

    diff(conjunto){
        let i = 0;

        while(i < this.tam){
            if(this.vetor[i] == true && conjunto.vetor[i] == false){
                this.vetor[i] == true;
            }
            else{
                this.vetor[i] == false;
            }
            i++;
        }
    }
}

let conj1 = new IntegerSet(10);
conj1.toString();
console.log(conj1.toString());
conj1.add(3);
console.log(conj1.toString());
conj1.add(8);
conj1.add(7);
conj1.add(5);
console.log(conj1.toString());