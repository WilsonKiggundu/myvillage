import React,{useState} from 'react'

import './progress.css'
interface PProps {
    score: number,
	style?:any,
	children?:any
}

const Progress = ({score, style, children}:PProps) => {
	const [customStyle, setStyle] = useState({});
	console.log(style)
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${score}%`
		}
		if(style){
			setStyle(style);
		}else{
			setStyle(newStyle);
		}
		
	}, 200);
	
	return (
		<div className="progress-container" style={{
			height: `${style.height}`,
			width: `${style.cardWidth}`,

			}}>
				
			<div className="progress-score" style={style?style:customStyle}>
				
			</div>
			<p className='progress'>{children}</p>
		</div>
	)
}

export default Progress