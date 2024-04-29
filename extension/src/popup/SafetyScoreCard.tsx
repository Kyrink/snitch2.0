import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

type SafetyData = {
    status?: string;
    reputations: number;
    confidence: number;
};

type ChildSafetyData = {
    reputations: number;
    confidence: number;
};

type SafetyScoreCardProps = {
    safetyData: SafetyData;
    childSafetyData: ChildSafetyData;
};

const SafetyScoreCard: React.FC<SafetyScoreCardProps> = ({
    safetyData,
    childSafetyData,
}) => {
    const safetyScore = safetyData.reputations;
    const childScore = childSafetyData.reputations;

    // Decide the color based on the score
    const color = green[500]; // The image shows green regardless of the score

    return (
        <Box sx={{ width: '330px', padding: 2, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Safety Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
                <CircularProgress variant="determinate" value={safetyScore} thickness={6} size={100} sx={{ color }} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" component="div" color="text.primary">
                        {`${Math.round(safetyScore)}%`}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                This site is safe enough to proceed
            </Typography>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Child Safety Score
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
                    <CircularProgress variant="determinate" value={childScore} thickness={5} size={60} sx={{ color }} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.primary">
                            {`${Math.round(childScore)}%`}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    This site is safe for children
                </Typography>
            </Box>
        </Box>
    );
};

export default SafetyScoreCard;
