import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'

function GameOver(props) {

    const { player } = props;
    return (
        <>

            <Grid2
                container
            >
                <Grid2
                    size={12}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        p={2}
                    >

                        <Typography
                            variant='h3'
                        >
                            Tebrikler! {player?.username} Oyunu Kazandı!

                        </Typography>

                    </Box>
                </Grid2>

            </Grid2>

        </>


    )
}

export default GameOver