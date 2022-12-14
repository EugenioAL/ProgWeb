
function jokenpo(){
    let playerVitoria = true;
    let vitorias = 0;
    let i = 0;
    while(playerVitoria){
        console.log("Entre com a sua jogada:\n1-Pedra\n2-Papel\n3-Tesoura");
        playerJogada = parseInt(prompt("Escolha:"));
        cpuJogada = Math.trunc(Math.random() * (4-1) + 1);
        condicao = cpuJogada - playerJogada;
        if(cpuJogada == 1){
            console.log("O compputador jogou Pedra");
        }
        if(cpuJogada == 2){
            console.log("O compputador jogou Papel");
        }
        if(cpuJogada == 3){
            console.log("O compputador jogou Tesoura");
        }
        if(playerJogada >= 1 && playerJogada <= 3){
            if(condicao > 0){
                console.log("Voçê perdeu! Suas vitorias foram:" + vitorias);
                playerVitoria = false;
            }
            if(condicao < 0){
                console.log("Voçê venceu!");
                vitorias++;
            }
            if( condicao === 0){
                console.log("A rodada empatou!");
            }
        }
        else{
            vitorias--;
        }
    }
}

jokenpo();