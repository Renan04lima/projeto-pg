# Projeto PP2 de Processamento Gráfico
Esse projeto foi feito durante a segunda parte da disciplina de Processamento Gráfico. Nele, precisávamos implementar uma cena em JavaScript por meio da API WebGL, sem utilizar bibliotecas de grande porte. As especificações eram:
- Visualização de pelo menos um objeto 3D por membro do grupo, redimensionando e posicionando cada objeto individualmente no ambiente virtual;
- Utilização de pelo menos dois shaders (vertex/fragment);
- Definição de pelo menos uma câmera;
- Movimento simples de pelo menos um objeto.

O grupo responsável por esse projeto foi o G14 com os integrantes:
- Leonardo Cavalcante da Silva - 792190
- Lucas Katib - 792193
- Renan Oliveira - 771061

# Cena Simplificada de Floresta
Escolhemos criar uma cena simplificada de floresta (com apenas duas árvores). Há uma rocha no meio de duas árvores na cena. Em cima dessa rocha, está um cogumelo especial flutuando. O cogumelo emana um brilho amarelo em forma de cubos amarelos giratórios.

É possível se movimentar pela cena utilizando o teclado. Com as teclas WASD a câmera se movimenta para frente, para trás e para os lados. Com as teclas de seta para cima e para baixo, a câmera sobe e desce.

Para visualizar a cena na web basta [clicar nesse link](https://forest-pp2-grupo-14.netlify.app) ou para rodar localmente no seu computador é necessário é necessário primeiro instalar o Python em seu computador (https://www.python.org/). Baixe os arquivos desse repositório e abra o terminal na pasta em que eles foram armazenados. No terminal digite o comando `python3 -m http.server 8000`. Esse comando inicia um servidor local em seu computador. Abra seu browser e digite no campo de url `localhost:8000` e clique em 'Enter'. A cena deve aparecer.

# Principais características implementadas
- Diversos modelos são carregados para cena. Alguns desses modelos são compostos de múltiplas partes (malhas). Os modelos são todos carregados a partir de um arquivo .json.
- Cada modelo tem uma matriz que é utilizada para posicioná-lo no sistema de coordena do mundo. Todos os modelos tiveram que ser rotacionados em 90 graus.
- A câmera foi posicionada próxima aos objetos e mirando para um dos brilhos do cogumelo.
- Dois shaders são utilizados. O vertex shader dá a posição de cada vértice do modelo e passa para o fragment shader a cor do vértice. O fragment shader pinta então o vértice. A cor de cada malha é escolhida durante a instanciação do modelo no código.
- O vertex shader considera as matrizes de projeção, visão e mundo.
- Três cubos pequenos amarelos giram em torno de seu eixo z para simular um brilho que circunda o cogumelo. Os blocos foram diretamente definidos no código.
- O chão foi feito pensando-se em um paralelepípedo posicionado abaixo do plano xy.
- A cena conta com iluminação direcional.
- É possível movimentar a câmera de diversas maneiras utilizando o teclado.

# Problemas durante a implementação
Durante a implementação, encontramos alguns problemas que não conseguimos resolver: 
- Não soubemos como carregar a textura dos modelos a partir do arquivo .json
- O chão da cena não é linear. Indo para trás por alguns segundos, é possível ver um pedaço sem chão.
- A ideia inicial era que o cogumelo girasse em torno do eixo z. Porém, não conhecíamos as transformações que haviam sido feitas no cogumelo para colocá-lo na origem. Tentamos de diversas maneiras, não obtendo sucesso.

# Estrutura do código
- Pasta bower_components: possui funções auxiliares de programação assíncrona, manipulação de matrizes e criação de matrizes úteis como a matriz da câmera.
- Pasta shaders: possui o arquivo do vertex shader e do fragment shader.
- Arquivos forest.json e forest.obj: dois arquivos do mesmo conjunto de modelos de objetos utilizados na cena.
- Arquivo util.json: possui funções auxiliares para leitura de parâmetros em urls, adição de eventos na página e carregamento de recursos externos da página.
- Arquivo Models.js: define a classe Model utilizada para guardar informações de cada modelo (malha). Além disso, define a classe da câmera e seus movimentos e uma função que cria um programa do OpenGL dado os shaders.
- Arquivo index.html: define o canvas em que a cena será reproduzida.
- Arquivo app.js: aciona a cena a partir do canvas.

## Arquivo ForestScene.js
- Método Load: carrega o arquivo .json do modelo e os arquivos dos shaders. A partir disso, cria e posiciona objetos na cena e cria o programa com os shaders. Além disso, instancia a câmera e cria as matrizes de visão e de projeção.
- Método Begin: começa o loop de atualizações e renderizações constantes da cena.
- Método _Update: rotaciona os cubos de brilho do cogumelo e altera a câmera segundo o precionamento de teclas do teclado para depois atualizar a matriz de visão.
- Método _Render: prepara os shaders e aciona a pintura dos objetos na cena.

# Recursos externos
Os modelos dos objetos, como as árvores e o cogumelo, foram carregados do modelo disponível em: https://www.turbosquid.com/pt_br/3d-models/3d-assets-tree-grass-rocks-1498368

Esse modelo foi convertido para um arquivo .json utilizando o programa assimp2json disponível em: https://github.com/acgessler/assimp2json

O projeto foi fortemente baseado nos vídeos de Kamaron Peterson diponíveis em: https://www.youtube.com/watch?v=kB0ZVUrI4Aw&list=PLjcVFFANLS5zH_PeKC6I8p0Pt1hzph_rt

O repositório com os arquivos criados por ele durante os tutorias está em: https://github.com/sessamekesh/IndigoCS-webgl-tutorials/

Para hospedar o projeto na internet usamos o [Netlify](https://www.netlify.com/)

## Sobre a reutilização de código
Todos os arquivos desse projeto foram criados a partir dos arquivos de Kamaron Peterson, em especial dos arquivos disponíveis em: https://github.com/sessamekesh/IndigoCS-webgl-tutorials/tree/master/Shadow%20Mapping

O arquivo que mais levou nosso trabalho foi o arquivo ForestScene.js. Os outros tiveram apenas pequenas mudanças. Os arquivos dos modelos de objeto foram obtidos separadamente.
