import {Suspense, lazy, useState, useTransition} from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import {useSpinDelay} from "spin-delay";

const loadGlobe = () => import('./globe.tsx')
const Globe = lazy(loadGlobe)

function App() {
	const [showGlobe, setShowGlobe] = useState(false)
	// 🐨 get the startTransition function from useTransition
	const [isTransitionPending, startTransition] = useTransition()

	const isPending = useSpinDelay(isTransitionPending)

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100%',
				padding: '2rem',
				// 🐨 set the opacity to 0.6 if we're currently pending as a simple pending state
				opacity: isPending ? 0.6 : 1,
			}}
		>
			<label
				style={{ marginBottom: '1rem' }}
				onFocus={loadGlobe}
				onPointerEnter={loadGlobe}
			>
				<input
					type="checkbox"
					checked={showGlobe}
					// 🐨 wrap setShowGlobe in startTransition
					onChange={(e) =>
						startTransition(() => setShowGlobe(e.currentTarget.checked))
					}
				/>
				{' show globe'}
			</label>
			<div style={{ width: 400, height: 400 }}>
				<Suspense fallback="loading...">
					{showGlobe ? <Globe /> : null}
				</Suspense>
			</div>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
