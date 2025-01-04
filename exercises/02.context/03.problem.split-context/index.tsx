import { createContext, memo, use, useMemo, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

// 🐨 rename this to FooterStateContext
const FooterStateContext = createContext<{
	color: string
	name: string
} | null>(null)
// 💯 If you want to be able to easily distinguish between the two providers in
// the react dev tools, add a .displayName property to the context object:
// 💰 FooterStateContext.displayName = 'FooterStateContext'
FooterStateContext.displayName = 'FooterStateContext'
// 🐨 create a FooterDispatchContext that has the setColor and setName properties
const FooterDispatchContext = createContext<{
	setColor: (color: string) => void
	setName: (name: string) => void
} | null>(null)

function FooterProvider({ children }: { children: React.ReactNode }) {
	const [color, setColor] = useState('black')
	const [name, setName] = useState('')
	// 🐨 split this value into two variables: footerStateValue and footerDispatchValue
	const footerStateValue = useMemo(() => ({ color, name }), [color, name])
	const footerDispatchValue = useMemo(() => ({ setColor, setName }), [
		setColor,
		setName,
	])
	return (
		// 🐨 render both context providers here with the appropriate values
		<FooterStateContext.Provider value={footerStateValue}>
			<FooterDispatchContext.Provider value={footerDispatchValue}>
				{children}
			</FooterDispatchContext.Provider>
		</FooterStateContext.Provider>
	)
}

// 🐨 rename this to useFooterState and update the implementation
function useFooterState() {
	const context = use(FooterStateContext)
	if (!context) throw new Error('FooterStateContext not found')
	return context
}

// 🐨 create a useFooterDispatch function similar to the hook above
function useFooterDispatch() {
	const context = use(FooterDispatchContext)
	if (!context) throw new Error('FooterDispatchContext not found')
	return context
}

const Footer = memo(function FooterImpl() {
	// 🐨 update this to useFooterState
	const { color, name } = useFooterState()
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

// 💯 as extra credit, you can memo this component and it will *never* re-render
const FooterSetters = memo(function FooterImplSetters(){
	// 🐨 update this to useFooterDispatch
	const { setColor, setName } = useFooterDispatch()
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
})

function App() {
	const [appCount, setAppCount] = useState(0)
	return (
		<FooterProvider>
			<div>
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
