import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        score: 0,
        start: false,
        players: null,
        currentPlayer: null,
        otherPlayer: null,
        city: null,
        room: null,
        whoseTurn: null,
    },
    reducers: {
        setPlayers: (state, { payload }) => {
            state.players = payload.players;
        },
        setCurrentPlayer: (state, { payload }) => {
            // console.log('current player payload : ', payload)
            state.currentPlayer = payload;
        },
        setOtherPlayer: (state, { payload }) => {
            console.log('other player payload : ', payload)
            state.otherPlayer = payload.players.find((player => player.username !== state.currentPlayer.username));
        },
        setCity: (state, { payload }) => {
            state.city = payload.city;
        },
        setRoom: (state, { payload }) => {
            state.room = payload;
        },
        setWhoseTurn: (state, { payload }) => {
            state.whoseTurn = payload;
        },
    },
});

export const { setRoom, setPlayers, setCurrentPlayer, setOtherPlayer, setCity, setWhoseTurn } = appSlice.actions;

export default appSlice.reducer;
