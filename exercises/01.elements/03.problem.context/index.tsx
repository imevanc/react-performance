import {createContext, use, useContext, useState} from 'react'
import * as ReactDOM from 'react-dom/client'

// 🐨 create a ColorContext
const ColorContext = createContext<string>('')

// 🐨 remove the prop
function Footer( ) {
	// 🐨 get the color from the ColorContext
	const color = use(ColorContext)
	return <footer style={{ color }}>I am the ({color}) footer</footer>
}

function Main({ footer }: { footer: React.ReactNode }) {
	const [count, setCount] = useState(0)
	const increment = () => setCount((c) => c + 1)
	return (
		<div>
			<button onClick={increment}>The count is {count}</button>
			{footer}
		</div>
	)
}

const footer = <Footer />

function App() {
	const [color, setColor] = useState('black')
	const [appCount, setAppCount] = useState(0)
	// 🐨 wrap all this with the ColorContext provider and pass the color
	return (
		<ColorContext.Provider value={color}>
			<div>
				<p>Set the footer color:</p>
				<div style={{ display: 'flex', gap: 4 }}>
					<button onClick={() => setColor('black')}>Black</button>
					<button onClick={() => setColor('blue')}>Blue</button>
					<button onClick={() => setColor('green')}>Green</button>
				</div>
			</div>
			<button onClick={() => setAppCount((c) => c + 1)}>
				The app count is {appCount}
			</button>
			{/* 🐨 remove the color prop and move this outside the component again */}
			<Main footer={footer} />
		</ColorContext.Provider>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
