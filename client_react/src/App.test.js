import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import App from './App';
import DwzList from './pages/dwz/inList';
import dwzlong from './pages/dwz/inLong';
import dwzshort from './pages/dwz/inShort';

test('renders default link', () => {
	const { getByText } = render(<App />);
	const linkElement = getByText(/Loading.../i);
	expect(linkElement).toBeInTheDocument();
});

describe("<DwzList />", () => {
	it("properly increments and decrements the counter", () => {
		const wrapper = shallow(<Router>
			<Route path="/list" component={DwzList} />
			<Route path="/" render={
				() => (
					<Redirect to="/list" />
				)
			}></Route>
		</Router>);
		console.log(wrapper);
	});
});
test('renders dwzlong link', () => {
	const { getByPlaceholderText } = render(<Router>
		<Route path="/cre" component={dwzlong} />
		<Route path="/" render={
			() => (
				<Redirect to="/cre" />
			)
		}></Route>
	</Router>);
	const inpEle = getByPlaceholderText('请输入长网址');
	expect(inpEle).toBeInTheDocument();
	let but = screen.queryByTestId('b_l_sub');
	fireEvent.click(but)
	//
	fireEvent.change(inpEle, { target: { value: 'www.sina.com' } });
	fireEvent.keyUp(inpEle, { keyCode: 13});
	// 
	let bakInfo = screen.queryByTestId('b_l_scode');
	// console.log(bakInfo);
});
test('renders dwzshort link', () => {
	const { getByPlaceholderText } = render(<Router>
		<Route path="/info" component={dwzshort} />
		<Route path="/" render={
			() => (
				<Redirect to="/info" />
			)
		}></Route>
	</Router>);
	const inpEle = getByPlaceholderText('请直接输入后缀(如:xxx)');
	expect(inpEle).toBeInTheDocument();
	let but = screen.queryByTestId('b_s_sub');
	fireEvent.click(but);
	//
	fireEvent.change(inpEle, { target: { value: '0000' } });
	fireEvent.click(but);
	//
	fireEvent.change(inpEle, { target: { value: 'LT3qNbZo' } });
	fireEvent.keyUp(inpEle, { keyCode: 13});
	// 
	let bakInfo = screen.queryByTestId('b_s_turl');
	// console.log(bakInfo);
});
