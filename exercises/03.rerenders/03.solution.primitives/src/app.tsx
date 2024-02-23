import { type UseComboboxPropGetters } from 'downshift'
import { memo, useEffect, useState } from 'react'
import { useSpinDelay } from 'spin-delay'
import { searchItems } from './cities'
import './index.css'
import { useAsync, useCombobox, useForceRerender } from './utils'

type Cities = Awaited<ReturnType<typeof searchItems>>
type City = Cities[number]

export function App() {
	const forceRerender = useForceRerender()
	const [inputValue, setInputValue] = useState('')

	const { data: allItems, run, status } = useAsync<Cities>()
	useEffect(() => {
		run(searchItems(inputValue))
	}, [inputValue, run])
	const items = allItems ?? []
	const isPending = useSpinDelay(status === 'pending')

	const {
		selectedItem,
		highlightedIndex,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		selectItem,
	} = useCombobox({
		items,
		inputValue,
		onInputValueChange: ({ inputValue: newValue = '' }) => {
			setInputValue(newValue)
		},
		onSelectedItemChange: ({ selectedItem }) =>
			alert(
				selectedItem
					? `You selected ${selectedItem.name}`
					: 'Selection Cleared',
			),
		itemToString: item => (item ? item.name : ''),
	})

	return (
		<div className="city-app">
			<button onClick={forceRerender}>force rerender</button>
			<div>
				<label {...getLabelProps()}>Find a city</label>
				<div>
					<input {...getInputProps({ type: 'text' })} />
					<button onClick={() => selectItem(null)} aria-label="toggle menu">
						&#10005;
					</button>
				</div>
				<ul
					{...getMenuProps({
						style: { opacity: isPending ? 0.6 : 1 },
					})}
				>
					{items.map((item, index) => {
						const isSelected = selectedItem?.id === item.id
						const isHighlighted = highlightedIndex === index
						return (
							<ListItem
								key={item.id}
								index={index}
								isSelected={isSelected}
								isHighlighted={isHighlighted}
								item={item}
								getItemProps={getItemProps}
							/>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

const ListItem = memo(function ListItem({
	index,
	item,
	isSelected,
	isHighlighted,
	getItemProps,
}: {
	index: number
	item: Cities[number]
	isSelected: boolean
	isHighlighted: boolean
	getItemProps: UseComboboxPropGetters<City>['getItemProps']
}) {
	return (
		<li
			key={item.id}
			{...getItemProps({
				index,
				item,
				style: {
					fontWeight: isSelected ? 'bold' : 'normal',
					backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
				},
			})}
		>
			{item.name}
		</li>
	)
})
