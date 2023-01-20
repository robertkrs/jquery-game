function inserePlacar(){
    const placar = $(".placar").find("tbody");
    var numCaracteres = $("#contador-caracteres").text();
    var usuario = "Robert";
   
  
    var novaTd = novaLinha(usuario, numCaracteres);
  
    novaTd.find("a").click(removeDaLista);
  
    placar.append(novaTd);
  
  }
  
  function novaLinha(usuario, numCaracteres){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaCaracteres = $("<td>").text(numCaracteres);
    var colunaRemover = $("<td>");
    var linkRemover = $("<a>").attr("href", "#");
    var iconeRemover = $("<i>").text("delete").addClass("small").addClass("material-icons");
  
    linkRemover.append(iconeRemover);
    colunaRemover.append(linkRemover);
    
    linha.append(colunaUsuario);
    linha.append(colunaCaracteres);
    linha.append(colunaRemover);
  
    return linha;
  
  }
  
  function removeDaLista(){
      $(this).parent().parent().remove();
    };