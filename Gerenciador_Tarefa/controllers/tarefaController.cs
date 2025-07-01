using Microsoft.AspNetCore.Mvc;
using Gerenciador_Tarefa.Models;
using System.Linq;

namespace Gerenciador_Tarefa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly GerenciadorContext _context;

        public TarefaController(GerenciadorContext context)
        {
            _context = context;
        }

        [HttpPost("adicionar")]
        public IActionResult Adicionar([FromBody] Tarefa tarefa)
        {
            tarefa.Andamento = false;
            _context.Tarefa.Add(tarefa);
            _context.SaveChanges();
            return Ok(tarefa);
        }

        [HttpGet("listar")]
        public IActionResult Listar()
        {
            var tarefas = _context.Tarefa.ToList();
            return Ok(tarefas);
        }

        [HttpPut("editar/{id}")]
        public IActionResult Editar(int id, [FromBody] Tarefa tarefaEditada)
        {
            var tarefa = _context.Tarefa.FirstOrDefault(t => t.Id == id);
            if (tarefa == null) return NotFound();

            tarefa.Titulo = tarefaEditada.Titulo;
            tarefa.Andamento = tarefaEditada.Andamento;
            _context.SaveChanges();
            return Ok(tarefa);
        }

        [HttpDelete("deletar/{id}")]
        public IActionResult Deletar(int id)
        {
            var tarefa = _context.Tarefa.FirstOrDefault(t => t.Id == id);
            if (tarefa == null) return NotFound();

            _context.Tarefa.Remove(tarefa);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("concluir/{id}")]
        public IActionResult Concluir(int id)
        {
            var tarefa = _context.Tarefa.FirstOrDefault(t => t.Id == id);
            if (tarefa == null) return NotFound();

            tarefa.Andamento = true;
            _context.SaveChanges();
            return Ok(tarefa);
        }
    }
}