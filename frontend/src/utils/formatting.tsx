export const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export const parseToNumber = (formattedValue: string): number => {
    // Remover todos os caracteres que não sejam dígitos ou um ponto
    const cleanedValue = formattedValue.replace(/[^\d.,]/g, '');

    // Converter de volta para um número
    const numberValue = parseFloat(cleanedValue.replace(',', '.')); // Considerando ',' como separador decimal

    return isNaN(numberValue) ? 0 : numberValue;
};
export const parseAlt = (imageUrl: String) => {
    const parts = imageUrl.split('/');
    const fileName = parts[parts.length - 1];
    const altName = fileName.split('?')[0];
    return altName
}

export const urlReplace = (e: string) => e.replace(/[^a-zA-Z0-9-]/g, '_')