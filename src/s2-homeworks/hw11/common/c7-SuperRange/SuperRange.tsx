import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера
                color: 'green',
                width: '300px',
                margin: '5px 20px',
                '& .MuiSlider-thumb:after': {
                    width: '8px',
                    height: '8px',
                    top: '50%',
                    left: '50%',
                    backgroundColor: 'white',
                }
            }}
            {...props}
            // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
