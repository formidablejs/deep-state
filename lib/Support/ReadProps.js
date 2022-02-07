Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ReadProps {
	
	static persist(component){
		var φ;
		
		try {
			
			return JSON.parse(((φ = component.attributes.props.nodeValue) != null) ? (φ) : '{}');
		} catch (φ2) {
			
			return {};
		};
	}
};
exports.ReadProps = ReadProps;
