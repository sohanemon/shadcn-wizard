import { suite, test } from 'mocha';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

suite('Snippet File Content Test Suite', () => {
    test('All new component snippets are present in the generated snippets file', () => {
        const snippetsFilePath = path.join(__dirname, '../../out/snippets.code-snippets');
        assert.ok(fs.existsSync(snippetsFilePath), 'snippets.code-snippets should exist');

        const snippetsContent = fs.readFileSync(snippetsFilePath, 'utf8');
        const parsedSnippets = JSON.parse(snippetsContent);

        const newComponents = [
            'breadcrumb',
            'buttonGroup',
            'chart',
            'dataTable',
            'datePicker',
            'emptyField',
            'inputGroup',
			'inputOtp',
			'inputItem',
			'kbd',
			'nativeSelect',
			'sidebar',
			'spinner',
			'sonner',
			'typography',
			'combobox',
			'tooltip'
		];

		newComponents.forEach(component => {
			const importSnippetName = `Import Shadcn ${component === 'inputOtp' ? 'InputOTP' : component.charAt(0).toUpperCase() + component.slice(1)}`;
			const anatomySnippetName = `Shadcn ${component === 'inputOtp' ? 'InputOTP' : component.charAt(0).toUpperCase() + component.slice(1)}`;

            assert.ok(parsedSnippets.hasOwnProperty(importSnippetName), `Import snippet for ${component} should be present`);
            assert.ok(parsedSnippets.hasOwnProperty(anatomySnippetName), `Anatomy snippet for ${component} should be present`);
        });
    });
});
