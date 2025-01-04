import {createContext, Dispatch, memo, SetStateAction, use, useMemo, useState} from 'react'
import * as ReactDOM from 'react-dom/client'

const FooterContext = createContext<{
	color: string
	setColor: Dispatch<SetStateAction<string>>
	// 🐨 add setColor to this type
	name: string
	setName: Dispatch<SetStateAction<string>>
	// 🐨 add setName to this type
} | null>(null)

// 🐨 create a FooterProvider component here and move the color and name state
// and context value to this component.
// 💰 Make sure to accept a children prop and render the FootContext with it
const FooterProvider = ({ children }: { children: React.ReactNode }) => {
	const [color, setColor] = useState('black')
	const [name, setName] = useState('')
	const value = useMemo(() => ({ color, setColor, name, setName }), [color, name])
	return <FooterContext.Provider value={value}>{children}</FooterContext.Provider>
}

function useFooter() {
	const context = use(FooterContext)
	if (!context) throw new Error('FooterContext not found')
	return context
}

const Footer = memo(function FooterImpl() {
	const { color, name } = useFooter()
	return (
		<footer style={{ color }}>
			I am the ({color}) footer, {name || 'Unnamed'}
		</footer>
	)
})

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

// 🐨 remove these props
function FooterSetters() {
	// 🐨 get setColor and setName from useFooter()
	const { setColor, setName } = useFooter()
	return (
		<>
			<div>
				<p>Set the footer color:</p>
				<div style={{ display: 'flex', gap: 4 }}>
					<button onClick={() => setColor('black')}>Black</button>
					<button onClick={() => setColor('blue')}>Blue</button>
					<button onClick={() => setColor('green')}>Green</button>
				</div>
			</div>
			<div>
				<p>Set the footer name:</p>
				<label>
					Name:
					<input onChange={(e) => setName(e.currentTarget.value)} />
				</label>
			</div>
		</>
	)
}

function App() {
	const [appCount, setAppCount] = useState(0)
	// 🐨 move the color, name, and value stuff to the new FooterProvider

	return (
		// 🐨 render the FooterProvider here instead of the FooterContext
		<FooterProvider>
			<div>
				{/* 🐨 remove these props */}
				<FooterSetters />
				<button onClick={() => setAppCount((c) => c + 1)}>
					The app count is {appCount}
				</button>
				<Main footer={<Footer />} />
			</div>
		</FooterProvider>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
