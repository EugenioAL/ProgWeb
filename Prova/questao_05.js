// Código desenvolvido corretamente
// Nota: 2.0


class Venda{
    constructor(id,quant,preco){
        this.id = id;
        this.quant = quant;
        this.preco = preco;
    }

    setId(val){
        this.id = val;
    }

    getId(){
        return this.id;
    }

    setQuant(val){
        this.id = this.quant;
    }

    getQuant(){
        return this.quant;
    }

    setPreco(val){
        this.id = val;
    }

    getPreco(){
        return this.id;
    }

    getValorTotal(){
        return this.quant * this.preco;
    }
}

const venda1 = new Venda(12,10,3);

console.log(venda1.getValorTotal());

const venda2 = new Venda(9,7,2);

console.log(venda2.getValorTotal());

