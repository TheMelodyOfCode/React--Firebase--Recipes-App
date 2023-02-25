


const bgVideoSrc = {

    tech:  'img/techBG.mp4',
    space: 'img/space1.mp4',
}

const BgVideo = ({videoSrc, ...otherProps})=>{

    return (
        <>
            <div className="bg-video ">
                <video className="bg-video__content" autoPlay muted loop >
                <source src={`${bgVideoSrc[videoSrc]}`} {...otherProps}/>
                {/* <source src="img/video.webm" type="video/webm">  */}
                    Your browser is not supported!
                </video>
            </div>
        </>
    )

}

export default BgVideo;