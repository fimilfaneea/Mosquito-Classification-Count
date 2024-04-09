import React from 'react';

const Images = () => {
    const baseUrl = 'http://127.0.0.1:5000/analyze-mosquitoes';
    const [imageNumber, setImageNumber] = React.useState(null);
    const imageList = [1, 2, 3, 4, 5, 6];

    // Array containing different text content for each button
    const textList = [
        "Date-Time taken: 08-04-2024 23:13:43",
        "Date-Time taken: 08-04-2024 21:59:05",
        "Date-Time taken: 06-04-2024 10:15:32",
        "Date-Time taken: 07-11-2022 08:27:19",
        "Date-Time taken: 09-07-2023 21:59:05",
        "Date-Time taken: 07-04-2024 15:42:50",
    ];

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    };

    const contentStyle = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
    };

    const buttonsContainerStyle = {
        display: 'flex',
        gap: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#E1F4F3',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const headingStyle = {
        fontFamily: 'Arial',
        fontSize: '20px',
        marginBottom: '10px',
        textDecoration: 'underline',
        fontWeight: 'bold',
    };

    const spacerStyle = {
        width: '20px', // Adjust the width for the desired space
    };

    // Function to handle button click and set the image number
    const handleClick = (item) => {
        setImageNumber(item);
    };

    return (
        <div style={containerStyle}>
            <div className='dashboard'>
                {/* Your dashboard content here */}
            </div>
            <div className='flex' style={buttonsContainerStyle}>
                <div style={spacerStyle}></div> {/* Empty div for horizontal space */}
                <div style={headingStyle}>Image Count Detection</div>
            </div>
            <div className='flex' style={buttonsContainerStyle}>
                {imageList?.map((item, index) => (
                    <div style={index === 0 ? { ...buttonStyle, marginLeft: '20px' } : buttonStyle} key={item} onClick={() => handleClick(item)}>
                        Sample {item}
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <div style={contentStyle}>
                    {imageNumber && <div>{textList[imageNumber - 1]}</div>}
                    {imageNumber && <img src={`${baseUrl}/${imageNumber}`} width={500} height={250} />}
                </div>
            </div>
        </div>
    );
};

export default Images;
