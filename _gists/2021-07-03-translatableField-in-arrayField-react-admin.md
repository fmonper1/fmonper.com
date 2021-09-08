---
title: 'TranslatableField inside ArrayField'
date: '2020-09-00T00:00:00.0000Z'
tags:
  - react-admin
  - typescript
---

This is a simple snippet to use with [React-admin](https://marmelab.com/react-admin) when we want to use a Translatable field inside a **FormIterator**

```tsx
<ArrayInput source="fields">
    <SimpleFormIterator>
        <SelectInput
            label="Field type"
            source="type"
            choices={skillFieldTypes}
            translateChoice={false}
        />
        <FormDataConsumer>
        {({ getSource, ...rest }) => {
            return (
                <TranslatableInputs
                    locales={["en", "es", "de", "de_AT", "de_UT"]}
                defaultLocale="en"
                >
                    <TextInput
                        source={getSource("names")}
                        defaultValue=""
                        label="Name"
                        {...rest}
                    />
                    <TextInput
                        source={getSource("descriptions")}
                        defaultValue=""
                        label="Description"
                        {...rest}
                    />
                </TranslatableInputs>
            );
        }}
        </FormDataConsumer>
    </SimpleFormIterator>
</ArrayInput>
```
