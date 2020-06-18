describe('calculator.js', function () {



  describe('Calculator', function () {


    beforeEach(function(){

      const cal = new Calculator();
      const cal2 = new Calculator(); 

      this.cal = cal;
      this.cal2 = cal2;

    });

    afterEach(function(){

     });

    it('should initialize the total', function () {

      expect(this.cal.total).toBe(0);
      expect(this.cal.total).toBeFalsy();
    });

    it('has constructor', function () {
      expect(this.cal).toEqual(this.cal2);
    });

    it('can be instantiated', function () {
      expect(this.cal).toBeTruthy();
    });


    it('instantiates unique object', function () {
      expect(this.cal).not.toBe(this.cal2);
    });

    it('has common opperations', function () {
      expect(this.cal.add).toBeDefined();
      expect(this.cal.subtract).toBeDefined();
      expect(this.cal.multiply).toBeDefined();
      expect(this.cal.divide).toBeDefined();

    });

    it('can overwrite total', function () {

      this.cal.total = null;
      expect(this.cal.total).toBeNull();

    });

    it('can contain Calc in the Calculator constructor name', function () {
      expect(this.cal.constructor.name).toContain("Calc");

    });

    describe('add()', function () {
      it('should add numbers to total', function () {
        //expect 0 + 5 to be 5
        this.cal.add(5);
        expect(this.cal.total).toBe(5);
      });

      it('returns total', function () {
        this.cal.total = 50;
        expect(this.cal.add(20)).toBe(70);
        expect(this.cal.total).toMatch(/-?\d+/);
        expect(typeof this.cal.total).toMatch('number');
        expect(this.cal.total).toEqual(jasmine.anything());
      });

    });

    describe('subtract()', function () {

      it('should subtract numbers from total', function () {
        //expect 30 - 5 to be 25
        this.cal.total = 30
        this.cal.subtract(5);
        expect(this.cal.total).toBe(25);
      });

    });

    describe('mulitply()', function () {
      it('should multiply total by numbers', function () {
        //expect 5 * 5 to be 25
        this.cal.total = 5
        this.cal.multiply(5);
        expect(this.cal.total).toBe(25);
      });

      it('does not handle NaN', function () {
        this.cal.total = 20;
        this.cal.multiply('a')
        expect(this.cal.total).toBeNaN();
      });
    });

    describe('divide()', function () {

      it('should divide total by numbers', function () {
        //expect 25 / 5 to be 5
        this.cal.total = 25
        this.cal.divide(5);
        expect(this.cal.total).toBe(5);
      });

      it('handles divide by zero', function () {
        expect(function () { this.cal.divide(0) }).toThrow();
        expect(function () { this.cal.divide(0) }).toThrowError(Error);
        //expect(function () { this.cal.divide(0) }).toThrowError(Error, 'Cannot divide by zero'); doest work with the this fuction (if define it as a let global it will work)
      });



    });

    describe('get version', function(){

      it('fetches version from external source', async function(done){
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(
            new Response('{ "version": "0.1" }')
        ));
        const version = await this.cal.version
          expect(version).toBe('0.1');

          done();
      });
    });
  });
});
