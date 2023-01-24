var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitacao");

$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicalizaMarcadores();
  $("#reiniciar").click(reinicializador);
  $("#usuarios").selectize({
    create: true,
    sortField: 'text'
  });
  $(".tooltip").tooltipster();
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var armazem = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(armazem);
}

function atualizaTempoInicial(tempo){
  tempoInicial = tempo;
  var tmpInicial = $("#tempo");
  tmpInicial.text(tempo);
}

function inicializaContadores() {
  campo.on("input", function () {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializaCronometro() {

  campo.one("focus", function () {

    var tempo = $("#tempo").text();

    const cronometroId = setInterval(() => {
      tempo--;
      $("#tempo").text(tempo);

      if (tempo < 1) {
        $("#reiniciar").attr("disabled", false);

        clearInterval(cronometroId);
        finalizaJogo();
      }
    }, 1000);
  });
}

function inicalizaMarcadores(){
  campo.on("input", function () {
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparacao = frase.substr(0, digitado.length);

    if (digitado == comparacao) {
      campo.addClass('borda-verde');
      campo.removeClass('borda-vermelha');
    } else {
      campo.addClass('borda-vermelha');
      campo.removeClass('borda-verde');
    }
  });
}

function reinicializador() {
  campo.attr("disabled", false);
  campo.val("");
  campo.toggleClass("campo-desativado");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo").text(tempoInicial);
  $("#reiniciar").attr("disabled", true);
  campo.removeClass('borda-verde');
  campo.removeClass('borda-vermelha');
  inicializaCronometro();
}

function finalizaJogo(){

  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();

}


