export class ReadProps
	static def persist component
		try
			return JSON.parse(component.attributes.props.nodeValue ?? '{}')
		catch
			return {}
