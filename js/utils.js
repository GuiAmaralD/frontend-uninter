export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeDescription(description) {
    if (!description) return '';

    // Dividir a descrição em frases usando o ponto final como delimitador
    const sentences = description.split('. ');

    // Capitalizar a primeira letra de cada frase
    const capitalizedSentences = sentences.map(sentence => {
        if (sentence.length > 0) {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        return sentence; // Caso a sentença esteja vazia
    });

    // Juntar as frases de volta em uma única string
    return capitalizedSentences.join('. ');
}