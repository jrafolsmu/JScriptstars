class Game {
    constructor(board, players, piece, idGame) {
      this.board = board;
      this.players = players;
      this.piece = piece;
      this.idGame = idGame;
    }

    //Getters
    get getPlayers(){
      return this.players;
    }

    get getBoard(){
      return this.board;
    }

    get getPiece(){
      return this.piece;
    }

    get getIdGame(){
        return this.idGame;
      }

    //Setters
    set setPlayers(players){
      this.players = players;
    }

    set setBoard(board){
      this.board = board;
    }

    set setPiece(piece){
      this.piece = piece;
    }

    set idGame (idGame){
      this.idGame = idGame;
    }
  } 