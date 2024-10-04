import { Box, Button, CircularProgress, Grid2, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCity, setCurrentPlayer, setOtherPlayer, setRoom, setWhoseTurn, } from '../redux/slices/appSlice'
import { socket } from '../socket'

function Starting() {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [user, setuser] = useState({})
    const [room, setroom] = useState({})
    const [roomOwner, setroomOwner] = useState(false);


    const handleClick = () => {
        if (!user.username && !room.roomName) {
            alert('Please enter both username and room name');
            return;
        } else {
            setisLoading(true);
            const updatedUser = { ...user, homeOwner: roomOwner, score: 0 };
            setuser(updatedUser);

            dispatch(setCurrentPlayer(updatedUser));
            dispatch(setRoom(room));
            socket.connect();
            socket.emit('ready', { user: updatedUser, room });
        }
    }

    useEffect(() => {
        socket.on('start_game', (data) => {
            console.log(data)
            setisLoading(false);

            dispatch(setOtherPlayer(data));
            dispatch(setCity(data));
            dispatch(setWhoseTurn(data.whoseTurn));


            navigation('/home');
        });

        return () => {
            socket.off('start_game');
        };
    }, [dispatch, navigation]);


    return (

        <Grid2
            container
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}

        >
            <Grid2
                size={12}
            >

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                >

                    <Box
                        mb={2}>
                        <Typography
                            variant='h4'
                        >
                            Do you want to start ?
                        </Typography>

                    </Box>

                    <Box
                        mb={2}>
                        <TextField
                            variant='standard'
                            label='Kullanıcı Adı'
                            value={user.username || ''}
                            onChange={(e) => setuser({ ...user, username: e.target.value })}
                            color='primary'
                        />
                    </Box>
                    <Box
                        mb={2}>
                        <TextField
                            variant='standard'
                            label='Oda Adı'
                            value={room.roomName || ''}
                            onChange={(e) => setroom({ ...room, roomName: e.target.value })}
                            color='primary'
                        />
                    </Box>
                    <Box
                        mb={2}
                    >
                        <FormControlLabel control={<Checkbox
                            onChange={(e) => setroomOwner(e.target.checked)}
                        />} label="Oda Sahibiyim" />


                    </Box>
                    <Box
                        mb={2}
                        display={'flex'}
                    >

                        <Button
                            onClick={handleClick}
                            variant='contained'
                        >
                            {(isLoading ? (
                                <>
                                    <CircularProgress size={24} color='white' />
                                </>
                            ) : ' Start')}
                        </Button>
                    </Box>
                </Box>
            </Grid2>

        </Grid2 >
    )
}

export default Starting