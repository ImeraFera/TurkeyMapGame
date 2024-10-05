import { Avatar, Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../components/Topbar';
import { socket } from '../socket'
import { setCity, setCurrentPlayer, setOtherPlayer, setWhoseTurn } from '../redux/slices/appSlice';
import TurkeyMap from '../components/TurkeyMap';

function updateCityColor(cityId) {

    const cityElement = document.getElementById(cityId);
    if (cityElement) {
        cityElement.style.fill = 'green';
    }
}

function Home() {
    const dispatch = useDispatch();

    const currentPlayer = useSelector(({ app }) => app.currentPlayer)
    const otherPlayer = useSelector(({ app }) => app.otherPlayer)
    const room = useSelector(({ app }) => app.room)
    const whoseTurn = useSelector(({ app }) => app.whoseTurn);
    const [foundList, setfoundList] = useState(null)

    const [city, setcity] = useState(useSelector(({ app }) => app.city))
    const [selectedCityElement, setselectedCityElement] = useState(null);

    useEffect(() => {
        socket.on('answer', (data) => {
            console.log(data)
            if (data.trueAnswer) {

                updateCityColor(data.correctCity?.id);
            }

            setfoundList(data.foundList)

            dispatch(setWhoseTurn(data.whoseTurn));

            dispatch(setCurrentPlayer(
                data.players.find(player => player.username === currentPlayer.username)
            ));
            dispatch(setOtherPlayer({
                players:
                    [
                        data.players.find(player => player.username === otherPlayer.username)
                    ]
            }
            ));

            setcity(data.nextCity);

        });

        return () => {
            socket.off('answer');
        };
    }, [selectedCityElement, foundList]);


    const handleClick = (event) => {
        if (whoseTurn?.username !== currentPlayer.username) {
            console.log('Your turn is not');
        } else {
            const cityId = event.target.id;

            setselectedCityElement(event.target);

            socket.emit('handle_click', {
                user: currentPlayer,
                choosenCity: cityId,
                room: room,
            });

            socket.emit('set_city');
        }
    }




    return (
        <Grid2
            container
            mt={2}
            spacing={2}
        >
            <Grid2
                size={12}
                bgcolor={'#9CAFB7'}
                borderRadius={'1em'}

            >
                <Topbar
                    player1={currentPlayer}
                    player2={otherPlayer}
                    city={city}
                ></Topbar>

            </Grid2>

            <Grid2
                bgcolor={'#9CAFB7'}
                borderRadius={'1em'}
                size={12}
            >
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    p={5}
                >

                    <TurkeyMap handleClick={handleClick}
                        foundList={foundList}
                    ></TurkeyMap>

                </Box>
            </Grid2>

            <Grid2
                size={12}
            >
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    borderRadius={'1em'}
                    bgcolor={whoseTurn?.username === currentPlayer.username ? 'green' : '#FE938C'}
                    justifyContent={'center'}
                    p={2}
                >
                    <Typography
                        variant='h3'
                        color='white'
                    >
                        {whoseTurn?.username === currentPlayer.username ? 'Senin Sıran !' : 'Sıra Rakibinde !'}
                    </Typography>
                </Box>
            </Grid2>
        </Grid2>
    )
}

export default Home