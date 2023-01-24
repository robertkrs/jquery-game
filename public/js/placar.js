var placar = $("#botao-placar");
var sincroniza = $("#botao-sync");

sincroniza.click(buscaPlacar);

$(function () {
  $(".deletar").click(removeDaLista);
  atualizaPlacar();
});

placar.click(mostraPlacar);
function inserePlacar(){
    const placar = $(".placar").find("tbody");
    var numCaracteres = $("#contador-caracteres").text();
    var usuario = $("#usuarios").val();
   
  
    var novaTd = novaLinha(usuario, numCaracteres);
  
    novaTd.find(".deletar").click(removeDaLista);
  
    placar.append(novaTd);
    $('.placar').slideDown(500);
    scrollPlacar();
  }
  
  function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar
    }, 1000);
}

  function novaLinha(usuario, numCaracteres){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaCaracteres = $("<td>").text(numCaracteres);
    var colunaRemover = $("<td>");
    var linkRemover = $("<a>").attr("href", "#").addClass("deletar");
    var iconeRemover = $("<i>").text("delete").addClass("small").addClass("material-icons");
  
    linkRemover.append(iconeRemover);
    colunaRemover.append(linkRemover);
    
    linha.append(colunaUsuario);
    linha.append(colunaCaracteres);
    linha.append(colunaRemover);
  
    return linha;
  
  }
  
  function removeDaLista(e){
      e.preventDefault();
      var linha = $(this).parent().parent();
      linha.fadeOut(600);
      setTimeout(function (){
        linha.remove();
      }, 600)
  };

  function mostraPlacar(){
    var mostra = $('.placar');
    mostra.stop().slideToggle(600);
  }

function buscaPlacar(){
  var placar = [];
  var tr = $("tbody>tr");
  
  tr.each(function (){
    var jogador = $(this).find("td:nth-child(1)").text();
    var pontos = $(this).find("td:nth-child(2)").text();

    var pontuacao = {
      jogador: jogador,
      pontos: pontos
    };
    placar.push(pontuacao);
  })

  var dados = {
    placar : placar
  };

  $.post("http://localhost:3000/placar", dados, function(){
    console.log("Deu certo");
    $(".tooltip").tooltipster("open");
  }).fail(function(){
    $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
  }).always(function(){
    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },1200);
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar", function(dados){
    $(dados).each(function(){
      var linha = novaLinha(this.jogador, this.pontos);
      linha.find(".deletar").click(removeDaLista);
      $("tbody").append(linha);
    })
 
})
}