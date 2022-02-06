let stateTree = null
let stateEvent = null

class State
	def constructor state\Object = {}
		return new Proxy(state, {
			get: do(target, prop)
				if typeof target[prop] === 'function' && prop == 'get'
					return do(...args)
						target[args[0]]

				elif typeof target[prop] === 'function' && prop == 'set'
					return do(...args)
						target[args[0]] = args[1]
						target.set(args[0], args[1])

						target[args[0]]
				else
					return target[prop]

			set: do(target, prop, value)
				target[prop] = value
		})

class EventBus
	prop eventTarget\EventTarget

	def constructor description\String = 'state-event'
		eventTarget = document.appendChild(document.createComment(description))

	def on type, listener
		eventTarget.addEventListener(type, listener)

	def emit type, detail
		eventTarget.dispatchEvent(new CustomEvent(type, { detail }))

def createAppState state
	stateTree = new State(state)

def hasState
	stateTree !== null

tag InitializeState
	def render
		<self>
			<slot>

		if self.attributes.state && document.appendChild
			stateEvent = new EventBus

			const state = self.attributes.state.nodeValue ?? '{}'

			createAppState(
				Object.assign(
					JSON.parse(state),
					{
						get: do(prop) null
						set: do(prop, value)
							stateEvent.emit('changed', {
								prop,
								value
							})
					}
				)
			)

def watch props\String[] = [], callback\Function
	if !stateEvent then return

	stateEvent.on 'changed', do(event)
		if props.includes(event.detail.prop)
			callback(event.detail.value, event.detail.prop)

export {
	createAppState
	EventBus
	hasState
	InitializeState
	stateEvent as event
	stateTree as state
	watch
}
