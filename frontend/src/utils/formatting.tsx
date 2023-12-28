export const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const parseAlt = (imageUrl: String) => {
    const parts = imageUrl.split('/');
    const fileName = parts[parts.length - 1];
    const altName = fileName.split('?')[0];
    return altName
}

export const urlReplace = (e: string) => e.replace(/[^a-zA-Z0-9-]/g, '_')