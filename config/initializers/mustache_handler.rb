class MustacheRails < Mustache
  
  def initialize(view_context, template_source)
    @view_context = view_context
    self.template = template_source
    assign_variables!
  end
    
  def respond_to?(method_sym, include_private = false)
    if @view_context.respond_to?(method_sym) 
      true
    else
      super
    end
  end
  
  def method_missing(method_name, *args, &block)
    @view_context.send(method_name,*args, &block)
  end
  
  # we wish to add instance vars from the view_context only 
  # none funcky ones
  private
  def assign_variables!
    variables = @view_context.instance_variable_names.select{|name| name =~ /^@[^_]/}
    variables.each do |name| 
      assign_name = name.gsub(/@/, "_")
      self[assign_name.to_sym] = @view_context.instance_variable_get(name)
    end
  end
end

class MustacheHandler < ActionView::Template::Handler
  include ActionView::Template::Handlers::Compilable

  self.default_format = :mustache

  def compile(template)
    mustache_class_name = "#{template.virtual_path}_view".classify
    mustache_class = mustache_class_name.constantize
    "#{mustache_class}.new(self, '#{template.source}').render.html_safe"
  end
end

ActionView::Template.register_template_handler(:mustache, MustacheHandler)