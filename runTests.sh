echo "Installing Karma..."
echo ""
npm install karma --save-dev
npm install karma-jasmine karma-chrome-launcher --save-dev
npm install -g karma-cli

echo ""
echo "Installing Jasmine..."
echo ""
cd static
npm install -g jasmine
cd ..

echo ""
echo "Running Tests..."
echo ""

karma start