# Formidable Deep State

## Introduction

A State Management library for Formidable.

Working Implementation
------

**welcome.imba** (Formidable view)

```ruby
export class Welcome < View

	def render
		<html>
			<head>
				<title> "Welcome"

			<body>
				<InfoComponent html:props=JSON.parse({
					locale: get('locale')
					formidableVersion: get('formidableVersion')
					nodeVersion: get('nodeVersion')
				})>
```

**info-component.imba** (Imba Component)

```ruby
export tag InfoComponent
	prop locale\String
	prop formidableVersion\String
	prop nodeVersion\String

	def changeLocale
		locale = 'es'

	def render
		if !rendered? then {
			locale, formidableVersion, nodeVersion
		} = readProps(self)

		<self>
			<p> "Locale: {locale}"
			<p> "Formidable Version: {formidableVersion}"
			<p> "Node Version: {nodeVersion}"

			<button @click=changeLocale> "Change Locale"
```

WIP
------

### The problem

When rendering a Formidable `view` from an action such as a route/controller action, the `view` fails to pass props to Imba Components.

### The solution

We need to reference the `InitializeState` Imba Component that can read attributes and pass them as props to the background state. This simple component just reads what has been passed under the `state` attribute and creates a new state object using the `createAppState` function.

**welcome.imba** (Formidable view)

```ruby
export class Welcome < View

	def render
		<html>
			<head>
				<title> "Welcome"

			<body>
				<InitializeState html:state=JSON.parse({
					locale: get('locale')
					formidableVersion: get('formidableVersion')
					nodeVersion: get('nodeVersion')
				})>

				<InfoComponent>
```

**info-component.imba** (Imba Component)
```ruby
export tag InfoComponent
	prop locale\String = state && state.locale
	prop formidableVersion\String = state && state.formidableVersion
	prop nodeVersion\String = state && state.nodeVersion

	def changeLocale
		state.set('locale', 'es')

	def rendered
		watch ['locale'], do(newValue)
			locale = newValue

	def render
		<self>
			<p> "Locale: {locale}"
			<p> "Formidable Version: {formidableVersion}"
			<p> "Node Version: {nodeVersion}"

			<button @click=changeLocale> "Change Locale"
```

Security
--------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.
