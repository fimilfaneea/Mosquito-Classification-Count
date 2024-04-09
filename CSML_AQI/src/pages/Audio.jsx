import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Audio = () => {
    const [matchingResults, setMatchingResults] = React.useState([]);
    const [noMatch, setNoMatch] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const sampleList = [1, 2, 3, 4, 5, 6]; // Changed imageList to sampleList

    const handleClick = (sampleNumber) => {
        setIsLoading(true);
        setMatchingResults([]);
        setNoMatch(false);
        const baseUrl = 'http://127.0.0.1:5000/analyze-audio';
        const url = `${baseUrl}/${sampleNumber}`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setMatchingResults(res.data[0]);
                } else {
                    setNoMatch(true);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px', // Added gap between the dashboard and buttons
        marginTop: '1px', // Added marginTop for space above the buttons
    };

    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: 'row', // Ensure buttons are in the same row
        gap: '20px',
        marginTop: '1px', // Added marginTop for space above the buttons
    };

    const buttonStyle = {
        backgroundColor: '#E1F4F3',
        padding: '15px',
        width: '100px',
        height: '50px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const firstButtonStyle = {
        ...buttonStyle,
        marginLeft: '30px', // Adjusted marginLeft for more space
    };

    const headingStyle = {
        fontFamily: 'Arial',
        fontSize: '20px',
        fontWeight: 'bold',
        textDecoration: 'underline',
        marginBottom: '10px', // Added marginBottom for space below the heading
        marginLeft: '20px', // Added marginLeft for space before the heading
    };

    const loadingStyle = {
        marginTop: '80px', // Adjusted marginTop to move the loading animation down
    };

    return (
        <div style={containerStyle}>
            <div className='dashboard'>
                {/* Your dashboard content here */}
            </div>
            <div style={headingStyle}>Species Detection</div>
            <div className='flex' style={buttonsContainerStyle}>
                {sampleList?.map((sample, index) => (
                    <div
                        className='p-10 background-red'
                        key={sample}
                        onClick={() => handleClick(sample)}
                        style={index === 0 ? firstButtonStyle : buttonStyle}
                    >
                        Sample {sample}
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center' style={loadingStyle}>
                {isLoading ? (
                    <div className='text-xl text-gray-600'>
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                    </div>
                ) : (
                    <>
                        {matchingResults && (
                            <div style={{ fontFamily: 'Arial', fontSize: '18px' }}>
                                {matchingResults.folder_name}
                            </div>
                        )}
                        {noMatch && <div style={{ fontFamily: 'Arial', fontSize: '18px' }}>No match</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Audio;
