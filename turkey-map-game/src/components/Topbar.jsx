import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

function Topbar(props) {


    const { player1, player2, city } = props;

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
        >

            {/* Sen */}
            <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'row'}
                p={1}
            >
                <Avatar
                    sx={{ width: 75, height: 75 }}
                ></Avatar>
                <Box>
                    <Typography
                        ml={2}
                        variant='h6'
                        color='white'
                    >
                        {player1.username}
                    </Typography>
                    <Typography
                        ml={2}
                        color='white'

                        variant='h6'
                    >
                        {player1.score}

                    </Typography>
                </Box>
            </Box>

            <Box display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography
                    variant='h3'
                    color='white'
                >
                    {city?.title}
                </Typography>
            </Box>

            {/* Rakip */}
            <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'row'}
                p={1}
            >

                <Box>
                    <Typography
                        mr={2}
                        variant='h6'
                        color='white'
                    >
                        {player2.username}

                    </Typography>
                    <Typography
                        mr={2}
                        color='white'

                        variant='h6'
                    >
                        {player2.score}
                    </Typography>
                </Box>
                <Avatar
                    sx={{ width: 75, height: 75 }}
                ></Avatar>
            </Box>
        </Box>
    )
}

export default Topbar