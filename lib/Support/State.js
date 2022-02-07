const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__'), Ψ__init__ = Symbol.for('#__init__'), ΨbeforeReconcile = Symbol.for('#beforeReconcile'), ΨplaceChild = Symbol.for('#placeChild'), ΨafterReconcile = Symbol.for('#afterReconcile');
var εSELF = Symbol(), εT = Symbol();
const {styles: imba_styles, get_document: imba_get_document, Component: imba_Component, createComponent: imba_createComponent, createLiveFragment: imba_createLiveFragment, defineTag: imba_defineTag} = require('imba'/*$path$*/);
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
let stateTree = null;
let stateEvent = null;

class State {
	
	/**
	@param {Object} state
	*/
	constructor(state = {}){
		
		return new Proxy(state,{
			get: function(target,prop) {
				
				if (typeof target[prop] === 'function' && prop == 'get') {
					
					return function(...args) {
						
						return target[args[0]];
					};
				} else if (typeof target[prop] === 'function' && prop == 'set') {
					
					return function(...args) {
						
						const oldValue = target[args[0]];
						
						target[args[0]] = args[1];
						target.set(args[0],args[1],oldValue);
						
						return target[args[0]];
					};
				} else {
					
					return target[prop];
				};
			},
			
			set: function(target,prop,value) {
				
				return target[prop] = value;
			}
		});
	}
};

class EventBus {
	[Ψ__init__]($$ = null){
		this.eventTarget = $$ ? $$.eventTarget : undefined;
		
	}
	/**
	@param {String} description
	*/
	constructor(description = 'state-event'){
		this[Ψ__init__]();
		this.eventTarget = imba_get_document().appendChild(imba_get_document().createComment(description));
	}
	
	on(type,listener){
		
		return this.eventTarget.addEventListener(type,listener);
	}
	
	emit(type,detail){
		
		return this.eventTarget.dispatchEvent(new CustomEvent(type,{detail: detail}));
	}
};

function createAppState(state){
	
	return stateTree = new State(state);
};

function hasState(){
	
	return stateTree !== null;
};

class InitializeState extends imba_Component {
	
	render(){
		var τSELF, ιSELF, ΔSELF, τT, φ;
		
		τSELF=this;
		τSELF[ΨbeforeReconcile]();
		(ιSELF=ΔSELF=1,τSELF[εSELF] === 1) || (ιSELF=ΔSELF=0,τSELF[εSELF]=1);
		τT=τSELF.__slots.__;
		(τSELF[εT] = τSELF[ΨplaceChild](τT,384,τSELF[εT]));
		;
		τSELF[ΨafterReconcile](ΔSELF);
		
		
		if (this.attributes.state && imba_get_document().appendChild) {
			
			stateEvent = new EventBus;
			
			const state = ((φ = this.attributes.state.nodeValue) != null) ? (φ) : '{}';
			
			return createAppState(
				Object.assign(
					JSON.parse(state),
					{
						get: function(prop) { return null; },
						set: function(prop,value,old) {
							
							return stateEvent.emit('changed',{
								prop: prop,
								value: value,
								old: old
							});
						}
					}
				)
			);
		};
	}
}; imba_defineTag('initialize-state-v1jz1w-ah',InitializeState,{});

/**
@param {String[]} props
@param {Function} callback
*/
function watch(props = [],callback){
	
	if (!stateEvent) { return };
	
	return stateEvent.on('changed',function(event) {
		
		if (props.includes(event.detail.prop)) {
			
			return callback(event.detail.value,event.detail.old,event.detail.prop);
		};
	});
};

exports.createAppState = createAppState;
exports.EventBus = EventBus;
exports.hasState = hasState;
exports.InitializeState = InitializeState;
exports.event = stateEvent;
exports.state = stateTree;
exports.watch = watch;

imba_styles.register('v1jz1w',`
initialize-state-v1jz1w-ah { display:block; }
`);