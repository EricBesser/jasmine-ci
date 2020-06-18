describe('main.js', function(){

    describe('Calculate()', function(){
        it('validate expression when first number is invalid', function(){
            spyOn(window,'updateResult').and.stub();
            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not reconized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validate expression when  second number is invalid', function(){
            spyOn(window,'updateResult');
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not reconized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validate expression when operation is invalid', function(){
            spyOn(window,'updateResult');
            calculate('5_5');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not reconized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls add()', function(){
            const spy1 = spyOn(Calculator.prototype, 'add');

            calculate('3 + 4');

            expect(spy1).toHaveBeenCalledTimes(2);
            expect(spy1).toHaveBeenCalledWith(3);
            expect(spy1).toHaveBeenCalledWith(4);
        });
        
        it('call subtract()', function(){
            const spy1 = spyOn(Calculator.prototype, 'add');            
            const spy2 = spyOn(Calculator.prototype, 'subtract');

            calculate('3 - 7');

            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy1).toHaveBeenCalledWith(3);
            expect(spy2).not.toHaveBeenCalledWith(3);
            expect(spy2).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith(7);
        });
        
        it('call multiply()', function(){
            const spy1 = spyOn(Calculator.prototype, 'add');
            const spy2 = spyOn(Calculator.prototype, 'multiply');

            calculate('3 * 4');

            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy1).toHaveBeenCalledWith(3);
            expect(spy2).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith(4);
        });
        it('call divide()', function(){
            const spy1 = spyOn(Calculator.prototype, 'add');
            const spy2 = spyOn(Calculator.prototype, 'divide');

            calculate('3 / 4');

            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy1).toHaveBeenCalledWith(3);
            expect(spy2).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith(4);
        });

        it('calls updateResult (example using and .callThrough)', function(){
            const spy1 = spyOn(window, 'updateResult');
            const spy2 = spyOn( Calculator.prototype, 'multiply').and.callThrough();

            calculate('5 * 5');

            expect(spy1).toHaveBeenCalled();
            expect(spy1).toHaveBeenCalledWith(25);


        });

        it('calls updateResult (example using and .callFake)', function(){
            const spy1 = spyOn(window, 'updateResult');
            const spy2 = spyOn( Calculator.prototype, 'multiply').and.callFake(function(number){
                return 'it works';
            });

            calculate('5 * 5');

            expect(spy1).toHaveBeenCalled();
            expect(spy1).toHaveBeenCalledWith('it works');


        });

        it('calls updateResult (example using and .returnValue)', function(){
            const spy1 = spyOn(window, 'updateResult');
            const spy2 = spyOn( Calculator.prototype, 'multiply').and.returnValue(25);

            calculate('5 * 5');

            expect(spy1).toHaveBeenCalled();
            expect(spy1).toHaveBeenCalledWith(25);


        });    
        
        
        it('calls updateResult (example using and .returnValues)', function(){
            const spy1 = spyOn(window, 'updateResult');
            const spy2 = spyOn( Calculator.prototype, 'add').and.returnValues(null, '10');

            calculate('5 + 5');

            expect(spy1).toHaveBeenCalled();
            expect(spy1).toHaveBeenCalledWith('10');


        });  


        it('does not handle erros', function(){
            const spy1 = spyOn(Calculator.prototype, 'multiply').and.throwError('Some Error');

            expect(function() { calculate( '5 * 5'); }).toThrowError('Some Error');


        } );


    }
    );


    describe('updateResult()', function(){
 
        beforeAll(function(){
           const ele = document.createElement('div');
            ele.setAttribute('id','Results');
            document.body.appendChild(ele);

            this.ele = ele;
        });


        afterAll(function(){

            document.body.removeChild(this.ele);
        });

        it('adds result to DOM element', function(){
            updateResult('5');
            expect(this.ele.innerText).toBe('5');
        });


    });

    describe('showVersion()', function(){

        it('calls calculator.version', function(){
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });

            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve());

            showVersion();
        
            //expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();

            expect(spy).toHaveBeenCalled();

        });

    });
});