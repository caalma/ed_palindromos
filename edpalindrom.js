class EdPalindrom {
    html = `
<p class="titulo">Editor simple para
    <a href="https://es.wikipedia.org/wiki/Pal%C3%ADndromo" target="_blank">PALÍNDROMOS</a>
</p>
<div class="textos">
   <div class="grp"><p>&nbsp;&nbsp;</p>
      <textarea name="tex_a" class="tex ini" autocomplete="off" title="Entrada Principal"></textarea>
   </div>
   <div class="grp">
      <input name="fij_b" type="checkbox" title="Fijar texto 1" checked>
      <textarea name="tex_b" class="tex" autocomplete="off" title="Edición texto 1"></textarea>
   </div>
   <div class="grp">
      <input name="fij_c" type="checkbox" title="Fijar texto 2">
      <textarea name="tex_c" class="tex" autocomplete="off" title="Edición texto 2"></textarea>
   </div>
</div>
<div class="menu">
   <button name="copiar" class="btn">COPIAR</button>
   <button name="limpiar" class="btn">LIMPIAR</button>
</div>
`;

    constructor (id_elem){
        this.el = document.getElementById(id_elem);
        this.el.classList.add('edpalindrom');
        this.el.innerHTML = this.html;
        this.tex_a = this.el.querySelector('[name=tex_a]');
        this.tex_b = this.el.querySelector('[name=tex_b]');
        this.tex_c = this.el.querySelector('[name=tex_c]');
        this.fij_b = this.el.querySelector('[name=fij_b]');
        this.fij_c = this.el.querySelector('[name=fij_c]');
        this.btn_copiar = this.el.querySelector('[name=copiar]');
        this.btn_limpiar = this.el.querySelector('[name=limpiar]');
        this.incluir_en_el_entorno();
        this.setear_eventos();
        return this;
    }



    incluir_en_el_entorno() {
        if(window.edpalin_editores === undefined){
            window.edpalin_editores = [];
        }
        window.edpalin_editores.push(this);
    }

    setear_eventos() {
        this.tex_a.addEventListener('keyup', ()=>{
            let t = this.tex_a.value;
            let texto_espejo = t.substr(0, t.length -1) + this.reverse_text(t);
            if(this.fij_b.checked){
                this.tex_b.value = texto_espejo;
            }
            if(this.fij_c.checked){
                this.tex_c.value = texto_espejo;
            }
        });

        this.btn_copiar.addEventListener('click', ()=>{
            this.enviar_al_portapapeles();
            this.informar_en_btn(this.btn_copiar, '# >> | |');
        });

        this.btn_limpiar.addEventListener('click', ()=>{
            this.limpiar_textos();
            this.informar_en_btn(this.btn_limpiar, '¡ (-_-) !');
        });
    }


    reverse_text(t) {
        return [...t].reverse().join('');
    }

    enviar_al_portapapeles() {
        let s = '---';
        let t = [
            s,
            this.tex_a.value, s,
            this.tex_b.value, s,
            this.tex_c.value,
            s,
        ].join('\n');
        navigator.clipboard.writeText(t);
    }

    limpiar_textos() {
        let t = '';
        this.tex_a.value = t;
        this.tex_b.value = t;
        this.tex_c.value = t;
    }

    informar_en_btn(e, t) {
        let o = e.innerHTML;
        e.innerHTML = t;
        setTimeout(()=>{ e.innerHTML = o }, 600);
    }

}
