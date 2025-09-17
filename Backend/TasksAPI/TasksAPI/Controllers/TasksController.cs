using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
using TaskAPI.Infrastructure;
using TasksAPI.Controllers.DTOs;
using TasksAPI.Domain.Models;

namespace TasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TasksController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _context.TaskItems.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskByIdAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskItem == null)
            {
                return NotFound();
            }

            return Ok(taskItem);
        }



        // POST: TaskItems/Create        
        [HttpPost]
        public async Task<IActionResult> CreateTaskAsync(TaskRequest taskCreateRequest)
        {
            var taskItem = new TaskItem
            {
                Title = taskCreateRequest.Title,
                Description = taskCreateRequest.Description,
                IsCompleted = taskCreateRequest.IsCompleted,
                CreatedAt = taskCreateRequest.CreatedAt,
                CompletedAt = taskCreateRequest.CompletedAt
            };
            _context.Add(taskItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(actionName: "Get",
                                   controllerName: "Tasks",
                                   routeValues: new { id = taskItem.Id },
                                   value: taskItem);

        }


        // PUT /tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PatchAsync(int id, TaskRequest taskUpdateRequest)
        {
            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskItem == null)
            {
                return NotFound();
            }
            taskItem.Title = taskUpdateRequest.Title;
            taskItem.Description = taskUpdateRequest.Description;
            taskItem.IsCompleted = taskUpdateRequest.IsCompleted;
            taskItem.CreatedAt = taskUpdateRequest.CreatedAt;
            taskItem.CompletedAt = taskUpdateRequest.CompletedAt;
            try
            {
                _context.Update(taskItem);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }

            return Ok(taskItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskItem == null)
            {
                return NotFound();
            }
            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        private bool TaskItemExists(int id)
        {
            return _context.TaskItems.Any(e => e.Id == id);
        }
    }
}
