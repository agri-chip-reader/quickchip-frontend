import LoadingScreen from 'react-loading-screen';

export default function loadingComponent(text){    
    return (
    <LoadingScreen
    loading={true}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    logoSrc='/static/images/logo-utec.png'
    text={text}
    >
    <div></div>
    </LoadingScreen>
    )
}
