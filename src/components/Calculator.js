import React from 'react';

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screen: '',
            prevNum: '',
            isOnOperator: false,
            operator: '',
            afterFirst: false,
        }
        this.numberClick = this.numberClick.bind(this)
        this.funClick = this.funClick.bind(this)
        this.calculate = this.calculate.bind(this)
    }
    numberClick(value, state = this.state) {
        if (state.isOnOperator) {
            this.setState({
                operator: state.screen,
                screen: value,
                isOnOperator: false
            })
        }else{
            this.setState({
                screen: String(state.screen) + value,
            })
        }
        
    }

    componentDidMount(){
        document.addEventListener('keydown', (event) => {
            
            if (!isNaN(event.key)) {
                this.numberClick(event.key)
            }else if (event.key === 'Enter') {
                event.preventDefault()
                this.calculate()
            } else if (['/','*','-','+'].includes(event.key)) {
                this.funClick(event.key)
            } else if(event.key === 'Backspace'){
                event.preventDefault()
                this.funClick('<=')
            }
        });
        
    }
    funClick(char){
        switch (char) {
            case 'clear':
                this.setState({
                    screen: '',
                    prevNum: '',
                    newNum: '',
                    afterFirst: false,
                })
                
                break;
        
            case '<=':
                if ((typeof this.state.screen) === 'string') {
                    this.setState({
                        screen: this.state.screen.slice(0, -1),
                    })
                }
                
                break;
            
            default:
                if (this.state.screen.length !== 0) {
                    if (!this.state.afterFirst) {
                        const holdState = this.state.screen
                        this.setState({
                            isOnOperator: true,
                            prevNum: holdState,
                            afterFirst: true,
                            operator: char,
                            screen: [char]
                        })
                    }else if (this.state.isOnOperator) {
                        this.setState({
                            operator: char,
                            screen: [char]
                        })
                    }
                    
                }
        }
        
    }

    calculate(){
        
        if (this.state.prevNum !== '' && this.state.operator !== '' && this.state.screen !== '') {
            const evalIt = {
                '+': function(x,y){return x + y},
                '-': function(x,y){return x - y},
                'x':function(x,y){return x*y},
                '*':function(x,y){return x*y},
                '÷':function(x,y){return x/y},
                '/':function(x,y){return x/y}
            };
            const first = this.state.prevNum
            const second = this.state.screen
            const operator = this.state.operator
            const result = evalIt[operator](parseFloat(first),parseFloat(second))

            this.setState({
                screen: result,
                prevNum: '',
                isOnOperator: false,
                operator: '',
                afterFirst: false,
            })
        }
        
    }

    render() {
        return (
            <div>
                <div className = 'row display p-3 bg-dark'>
                    <div className = 'col-12 text-white largest-font text-right'>
                        {this.state.screen}
                    </div>
                </div>
                <div className = "row">
                    {['clear']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-6'} handleClick = {this.funClick}/>
                    })}
                    {['<=']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-3'} handleClick = {this.funClick} />
                    })}
                    {['+']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-3'} handleClick = {this.funClick} />
                    })}
                    {[7,8,9]
                    .map((num, index) => {
                        return <Button key = {index} num = {num} col = {'col-3'} numberClick = {this.numberClick}/>
                    })}
                    {['-']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-3'} handleClick = {this.funClick} />
                    })}
                    {[4,5,6]
                    .map((num, index) => {
                        return <Button key = {index} num = {num} col = {'col-3'} numberClick = {this.numberClick}/>
                    })}
                    {['x']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-3'} handleClick = {this.funClick} />
                    })}
                    {[1,2,3]
                    .map((num, index) => {
                        return <Button key = {index} num = {num} col = {'col-3'} numberClick = {this.numberClick}/>
                    })}
                    {['÷']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-3'} handleClick = {this.funClick} />
                    })}
                    {[0]
                    .map((num, index) => {
                        return <Button key = {index} num = {num} col = {'col-6'} numberClick = {this.numberClick}/>
                    })}
                    {['=']
                    .map((char, index) => {
                        return <FunctionButton key = {index} char = {char} col = {'col-6'} handleClick = {this.calculate}/>
                    })}
                </div>
            </div>
        );
    }
}

function Button(props) {
    return(
        <div className = {`nopad ${props.col}`}>
            <button className = "calc-btn text-white button text-center bg-warning border py-4 increase" onClick = {(() => {
                props.numberClick(props.num)
            })}>
                {props.num}
            </button>
        </div>
    )
}


function FunctionButton(props) {
    return(
        <div className = {`nopad ${props.col}`}>
            <button className = "calc-btn text-white button text-center bg-danger border py-4 increase" onClick = {() => {
                props.handleClick(props.char)
            }} >
                {props.char}
            </button>
        </div>
    )
}
export default Calculator