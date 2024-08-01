const config = {
	draggable: true,
	position: 'start',
	onDragStart: onDragStart,
	onDrop: onDrop,
	onSnapEnd: onSnapEnd,
	onMouseoverSquare: onMouseoverSquare,
	onMouseoutSquare: onMouseoutSquare
}

// script.js

window.onload = function() {
	document.getElementById('new-game').addEventListener('click', newGame);
	document.getElementById('change-theme').addEventListener('click', changeTheme);
}

function newGame() {
	// logic for starting a new game goes here
	console.log('New game started');
}

function changeTheme() {
	// logic for changing the theme goes here
	console.log('Theme changed');
}

const game = new Chess();
const board = Chessboard('myBoard', config);
const $searchDepth = $('#searchDepth');

const pawnEvalWhite =
	[
		[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
		[1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
		[0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
		[0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
		[0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
		[0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
		[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
	];

const pawnEvalBlack = reverseArray(pawnEvalWhite);

const knightEval =
	[
		[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
		[-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
		[-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
		[-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
		[-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
		[-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
		[-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
		[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
	];

const bishopEvalWhite =
	[
		[-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
		[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
		[-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
		[-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
		[-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
		[-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
		[-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
		[-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
	];

const bishopEvalBlack = reverseArray(bishopEvalWhite);

const rookEvalWhite =
	[
		[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
		[0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
	];

const rookEvalBlack = reverseArray(rookEvalWhite);

const queenEval =
	[
		[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
		[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
		[-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
		[-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
		[0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
		[-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
		[-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
		[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
	];

const kingEvalWhite =
	[
		[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
		[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
		[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
		[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
		[-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
		[-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
		[2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
		[2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
	];

const kingEvalBlack = reverseArray(kingEvalWhite);

// Function to reverse an array
function reverseArray(array) {
	return array.slice().reverse();
}

// Handling drag events
function onDragStart(source, piece) {
	if (game.game_over() || piece.search(/^b/) !== -1) {
		return false;
	}
}

// Handling drop events
function onDrop(source, target) {
	const move = game.move({ from: source, to: target, promotion: 'q' });

	if (move === null) return 'snapback';

	setTimeout(makeBestMove, 250);
}

// Function to make the best move
function makeBestMove() {
	if (game.game_over()) return alert('Checkmate!');

	const depth = +$searchDepth.prop('value');
	const bestMove = minimaxRoot(game, depth, true);
	game.move(bestMove);
	board.position(game.fen());

	if (game.game_over()) alert('Checkmate!');
}

// Functions to handle mouse events on squares
function onMouseoverSquare(square) {
	const moves = game.moves({ square: square, verbose: true });
	if (moves.length === 0) return;

	greySquare(square);
	moves.forEach(move => greySquare(move.to));
}

function onMouseoutSquare() {
	$('#myBoard .square-55d63').css('background', '');
}

// Function to handle end of snap
function onSnapEnd() {
	board.position(game.fen());
}

// Function to color squares
function greySquare(square) {
	const $square = $(`#myBoard .square-${square}`);
	let background = $square.hasClass('black-3c85d') ? '#696969' : '#a9a9a9';
	$square.css('background', background);
}

function minimax(game, depth, alpha, beta, maximizingPlayer) {
	if (depth === 0) {
		return -evaluateBoard(game.board());
	}

	const moves = game.moves();

	if (maximizingPlayer) {
		let bestMove = -Infinity;
		for (const move of moves) {
			game.move(move);
			const value = minimax(game, depth - 1, alpha, beta, false);
			bestMove = Math.max(bestMove, value);
			alpha = Math.max(alpha, value);
			if (alpha >= beta) {
				game.undo();
				break;
			}
			game.undo();
		}
		return bestMove;
	} else {
		let bestMove = +Infinity;
		for (const move of moves) {
			game.move(move);
			const value = minimax(game, depth - 1, alpha, beta, true);
			bestMove = Math.min(bestMove, value);
			beta = Math.min(beta, value);
			if (alpha >= beta) {
				game.undo();
				break;
			}
			game.undo();
		}
		return bestMove;
	}
}

function minimaxRoot(game, depth, maximizingPlayer) {
	const moves = game.moves();
	let bestMove = -Infinity;
	let bestMoveFound = null;

	for (const move of moves) {
		game.move(move);
		const value = minimax(game, depth - 1, -Infinity, Infinity, !maximizingPlayer);
		game.undo();
		if (value >= bestMove) {
			bestMove = value;
			bestMoveFound = move;
		}
	}

	return bestMoveFound;
}

function evaluateBoard(board) {
	let totalEvaluation = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			totalEvaluation += getPieceValue(board[i][j], i, j);
		}
	}
	return totalEvaluation;
}

function getPieceValue(piece, x, y) {
	if (piece === null) {
		return 0;
	}
	let absoluteValue;
	if (piece.type === 'p') {
		absoluteValue = 10 + (piece.color ? pawnEvalWhite[x][y] : pawnEvalBlack[x][y]);
	} else if (piece.type === 'n') {
		absoluteValue = 30 + knightEval[x][y];
	} else if (piece.type === 'b') {
		absoluteValue = 30 + (piece.color ? bishopEvalWhite[x][y] : bishopEvalBlack[x][y]);
	} else if (piece.type === 'r') {
		absoluteValue = 50 + (piece.color ? rookEvalWhite[x][y] : rookEvalBlack[x][y]);
	} else if (piece.type === 'q') {
		absoluteValue = 90 + queenEval[x][y];
	} else if (piece.type === 'k') {
		absoluteValue = 1000 + (piece.color ? kingEvalWhite[x][y] : kingEvalBlack[x][y]);
	} else {
		throw Error(`Unknown piece type: ${piece.type}`);
	}

	return piece.color === 'w' ? absoluteValue : -absoluteValue;
}
